# Schema Design – Smart Clinic Management System

## MySQL Database Design

<!-- MySQL is used for structured, relational data that requires validation and foreign key relationships. -->

### Table: patients
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(50), Not Null
- last_name: VARCHAR(50), Not Null
- email: VARCHAR(100), Unique, Not Null
- password: VARCHAR(255), Not Null
- phone: VARCHAR(15)
- date_of_birth: DATE
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP

### Table: doctors
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(50), Not Null
- last_name: VARCHAR(50), Not Null
- specialty: VARCHAR(100), Not Null
- email: VARCHAR(100), Unique, Not Null
- phone: VARCHAR(15)
- available: BOOLEAN, Default TRUE
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP

### Table: appointments
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- patient_id: INT, Foreign Key → patients(id)
- appointment_time: DATETIME, Not Null
- duration_minutes: INT, Default 60
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP

<!-- If a patient is deleted, their appointments should be cascaded or soft-deleted. Doctors should not have overlapping appointments at the same time. -->

### Table: admin
- id: INT, Primary Key, Auto Increment
- username: VARCHAR(50), Unique, Not Null
- password: VARCHAR(255), Not Null
- role: VARCHAR(20), Default 'admin'
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP

### Table: doctor_availability
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- day_of_week: INT (0 = Sunday, 6 = Saturday)
- start_time: TIME, Not Null
- end_time: TIME, Not Null

<!-- Each doctor can have multiple availability slots per week. This table allows patients to only see open time slots when booking. -->

## MongoDB Collection Design

<!-- Prescriptions are a good fit for MongoDB because they can vary in structure — some may have pharmacy info, refill counts, or nested medication lists. This flexibility makes a document-based approach ideal. -->

### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "patientId": 12,
  "patientName": "Jane Doe",
  "doctorId": 3,
  "doctorName": "Dr. Smith",
  "appointmentId": 51,
  "date": "2026-04-08",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "3 times daily",
      "duration": "7 days"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "As needed",
      "duration": "5 days"
    }
  ],
  "doctorNotes": "Patient has mild infection. Follow up in 1 week.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street",
    "phone": "415-555-0199"
  },
  "tags": ["infection", "follow-up"],
  "createdAt": "2026-04-08T14:30:00Z"
}
```

<!-- MongoDB documents can store arrays (like multiple medications) and nested objects (like pharmacy details) without needing separate join tables. The schema can also evolve over time — for example, adding a "labResults" field later without migrating existing records. -->