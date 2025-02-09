Start the backend first:

cd project/patient-monitoring/src
npm run dev

Next start the frontend:

cd project/patient-monitoring/src/client
npm start


In order to add another patient:

Go to postman app
Select POST method and give this link in the url: http://localhost:3000/api/patients
Goto Body, select raw and in dropdown select JSON
Format:
{
    "name": "Jane Smith",
    "age": 45,
    "gender": "female"
}
Then hit Send

In order to delete patient:

Go to postman app
Select DELETE method and give this in the url link: http://localhost:3000/api/patients/2 (at the end followed by the id of the patient which you want to delete)

In order to view all the patients added:

Go to postman app
Select GET method and give this in the url link: http://localhost:3000/api/patients

