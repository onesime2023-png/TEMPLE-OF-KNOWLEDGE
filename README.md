# Temple of Knowledge Academic Evaluation System — Administrator milestone

## Implemented in this increment
- Role-aware login and dashboards for admin, teacher and student.
- Admin account creation UI backed by `createManagedUser` callable Cloud Function.
- Admin class and subject creation/listing.
- Admin examination draft creation and examination listing.
- Teacher examination draft creation/listing.
- Student listing of published examinations for their assigned class.
- Firestore rules deny client-side writes to user profiles, answer keys and submissions.
- GitHub Actions workflow publishes `public/` to GitHub Pages.

This is a working administrator foundation, not yet the complete exam platform. Question-bank authoring, publishing workflow, timed test taking, server-validated submission, objective grading, teacher marking, result publication and PDF reports remain future milestones.

## Configure Firebase
1. Create a Firebase project and a Web App.
2. Enable Authentication > Email/Password.
3. Create Firestore.
4. Replace placeholders in `public/js/firebase.js` with the Web App config.
5. In Authentication authorized domains, add your GitHub Pages domain.
6. Bootstrap the first administrator manually: create their Auth user, then create `users/{uid}` with `displayName`, `email`, `role: admin`, `active: true`.

## Deploy backend and rules
Requires Node.js 20 and Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules
cd functions && npm install && cd ..
firebase deploy --only functions
```
The callable account-creation function requires Cloud Functions. Firebase Functions deployment normally requires the Blaze billing plan and a linked billing account. Set budget alerts; actual cost depends on usage.

## Deploy GitHub Pages
1. Push the project root contents to a GitHub repository's `main` branch.
2. In repository Settings > Pages, select **GitHub Actions** as source.
3. Wait for the `Deploy GitHub Pages` workflow to complete.
4. Add the resulting `username.github.io` domain to Firebase Authentication authorized domains.

## Account management
After the first admin is provisioned and the callable function deployed, use Admin > Manage accounts. The server creates Auth users and Firestore profiles. Students must be assigned a `className`. No self-registration or client-side role assignment is provided.

## Data model
- `users/{uid}`: `displayName`, `email`, `role`, `active`, optional `className`.
- `classes/{classId}`: `name`, `academicYear`, `createdBy`, `createdAt`.
- `subjects/{subjectId}`: `name`, `code`, `createdBy`, `createdAt`.
- `exams/{examId}`: `title`, `className`, `subject`, `durationMinutes`, `instructions`, `status`, `teacherId`, `createdAt`.
- `exams/{examId}/questions/{questionId}`: student-visible question data only.
- `exams/{examId}/answerKeys/{questionId}`: private answer key data.
- `exams/{examId}/submissions/{studentUid}`: server-managed submission data.

## Security and current limitations
- Do not store service-account JSON, private keys or admin credentials in this repository.
- Firebase Web App config is project-identifying config, not a service-account secret; still configure Firestore rules and App Check as appropriate.
- Answer keys are a separate restricted subcollection. Student access to published exams and their questions is restricted by the student's `className`.
- Client-side writes to submissions are deliberately denied until a trusted submission callable is implemented.
- This increment does not yet implement a question editor, exam publishing UI, timer, submission callable, objective grading, manual marking, or reports. Do not use this release for live examinations.
- Review Firestore rules and test with Firebase Emulator Suite before real student data is entered.
