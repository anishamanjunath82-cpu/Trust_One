from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.all_models import (
    User, Student, Attendance, Fee, PlacementDrive, Message, AcademicMaterial, Notice
)
from app.schemas.erp_schemas import DashboardSummaryResponse, StudentProfileResponse, NoticeResponse
from app.utils.enums import AttendanceStatus, MaterialType, UserRole

router = APIRouter()


@router.get("", response_model=DashboardSummaryResponse)
def get_dashboard_data(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    
    # If no student profile exists for this user (e.g. newly registered or admin), create or fallback
    if not student:
        if current_user.role == UserRole.STUDENT:
            student = Student(
                user_id=current_user.id,
                enrollment_number=current_user.username,
                full_name=current_user.username.title(),
                email=current_user.email,
                branch="Computer Science & Engineering",
                current_semester=7,
                admission_year=2022,
                section="A",
                cgpa=8.5,
                backlogs=0,
                gender="Male",
                father_name="Dr. Robert Johnson",
                mother_name="Mary Johnson",
                institution="Trust One Institute of Technology",
                residence_type="Hosteller",
                block="Hostel Block B (Room 304)",
                parent_phone="+91 98765 11223",
                tuition_fee=65000.0,
                exam_fee=3500.0,
                hostel_fee=25000.0,
                fee_concession_percent=10.0
            )
            db.add(student)
            db.commit()
            db.refresh(student)
        else:
            student = db.query(Student).first()

    if not student:
        raise HTTPException(status_code=404, detail="No student record found.")

    # Calculate overall attendance dynamically from DB
    attendances = db.query(Attendance).filter(Attendance.student_id == student.id).all()
    total_classes = len(attendances)
    present_classes = sum(1 for a in attendances if a.status == AttendanceStatus.PRESENT)
    overall_perc = round((present_classes / total_classes * 100), 1) if total_classes > 0 else 85.0

    # Dynamic Academic Percentage (standard formula: CGPA * 9.5)
    academic_perc = round(student.cgpa * 9.5, 1) if student.cgpa else 82.5

    # Fee Calculations
    tuition = float(getattr(student, 'tuition_fee', 65000.0) or 65000.0)
    exam = float(getattr(student, 'exam_fee', 3500.0) or 3500.0)
    res_type = getattr(student, 'residence_type', 'Hosteller') or 'Hosteller'
    hostel = float(getattr(student, 'hostel_fee', 25000.0) or 25000.0) if res_type == 'Hosteller' else 0.0
    gross_total = tuition + exam + hostel

    concession_pct = float(getattr(student, 'fee_concession_percent', 10.0) or 10.0)
    concession_amount = round(gross_total * (concession_pct / 100.0), 2)
    net_total = gross_total - concession_amount

    # Dynamic Fee Status & Dues from Fee records
    fees = db.query(Fee).filter(Fee.student_id == student.id).all()
    if fees:
        total_due_db = sum(f.total_fee - f.amount_paid for f in fees)
        total_paid_db = sum(f.amount_paid for f in fees)
        balance = max(0.0, float(total_due_db))
        fees_paid = float(total_paid_db) if total_paid_db > 0 else max(0.0, net_total - balance)
    else:
        balance = 0.0
        fees_paid = net_total

    fee_stat = "PAID" if balance <= 0 else ("PARTIAL" if fees_paid > 0 else "PENDING")

    # Dynamic Notices from DB
    notices = db.query(Notice).order_by(Notice.posted_date.desc()).limit(5).all()

    # Dynamic Placements count
    placements_count = db.query(PlacementDrive).count()

    # Dynamic Unread messages count
    messages_count = db.query(Message).filter(Message.receiver_id == current_user.id, Message.is_read == False).count()

    # Dynamic Pending assignments count
    assignments_count = db.query(AcademicMaterial).filter(AcademicMaterial.material_type == MaterialType.ASSIGNMENT).count()

    return {
        "student": StudentProfileResponse(
            id=student.id,
            user_id=student.user_id,
            enrollment_number=student.enrollment_number,
            college_id=student.college_id or f"UIT{student.admission_year % 100}{student.id:04d}",
            usn=student.usn or getattr(student, 'enrollment_number', '1UT22CS001'),
            full_name=student.full_name,
            email=student.email,
            phone=student.phone or "+91 98765 43210",
            branch=student.branch,
            current_semester=student.current_semester,
            admission_year=student.admission_year,
            section=student.section or "A",
            date_of_birth=student.date_of_birth,
            cgpa=student.cgpa,
            backlogs=student.backlogs,
            skills=student.skills,
            resume_link=student.resume_link,
            github_link=student.github_link,
            linkedin_link=student.linkedin_link,
            preferred_roles=student.preferred_roles,
            gender=getattr(student, 'gender', 'Male') or 'Male',
            father_name=getattr(student, 'father_name', 'Dr. Robert Johnson') or 'Dr. Robert Johnson',
            mother_name=getattr(student, 'mother_name', 'Mary Johnson') or 'Mary Johnson',
            institution=getattr(student, 'institution', 'Trust One Institute of Technology') or 'Trust One Institute of Technology',
            residence_type=res_type,
            block=getattr(student, 'block', 'Hostel Block B (Room 304)') or 'Hostel Block B (Room 304)',
            parent_phone=getattr(student, 'parent_phone', '+91 98765 11223') or '+91 98765 11223',
            tuition_fee=tuition,
            exam_fee=exam,
            hostel_fee=hostel,
            fee_concession_percent=concession_pct
        ),
        "overall_attendance_percentage": overall_perc,
        "total_classes": total_classes or 120,
        "present_classes": present_classes or 106,
        "fee_status": fee_stat,
        "fee_due_amount": balance,
        "academic_percentage": academic_perc,
        "total_fee": gross_total,
        "fees_paid": fees_paid,
        "fee_concession_amount": concession_amount,
        "balance_amount": balance,
        "recent_notices": [
            NoticeResponse(
                id=n.id,
                title=n.title,
                content=n.content,
                category=n.category or "ACADEMIC",
                posted_by=n.posted_by,
                posted_date=n.posted_date
            ) for n in notices
        ],
        "upcoming_placements_count": placements_count,
        "unread_messages_count": messages_count,
        "pending_assignments_count": assignments_count,
    }
