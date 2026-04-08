# Schema Architecture – Smart Clinic Management System

## Section 1: Architecture Summary

This Spring Boot application uses both MVC and REST controllers. Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules. The application interacts with two databases — MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions). All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories. MySQL uses JPA entities while MongoDB uses document models.

## Section 2: Numbered Flow of Data and Control

1. The user accesses the application through either Thymeleaf-based web dashboards (`AdminDashboard`, `DoctorDashboard`) or REST API clients (`Appointments`, `PatientDashboard`, `PatientRecord`).
2. The request is routed to the appropriate backend controller — Thymeleaf Controllers for server-rendered views, or REST Controllers for API consumers.
3. The controller delegates the request to the Service Layer, which applies business rules, validations, and coordinates workflows across multiple entities.
4. The service layer communicates with the Repository Layer — MySQL Repositories (using Spring Data JPA) for structured relational data, or the MongoDB Repository (using Spring Data MongoDB) for document-based data.
5. The repositories access the underlying databases — MySQL for core entities like Patient, Doctor, Appointment, and Admin, or MongoDB for flexible records like Prescription.
6. Data retrieved from MySQL is mapped into JPA entities (annotated with `@Entity`), and data from MongoDB is mapped into document objects (annotated with `@Document`).
7. The bound models are used in the response layer — in MVC flows they are passed to Thymeleaf templates and rendered as dynamic HTML, and in REST flows they are serialized into JSON and returned to the client.
