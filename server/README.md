# MuseoPass

## Project Setup

### Environment Variables
To run this project, you need to create a `.env` file in the root directory of your project and include the following variables:

PORT
DB_CONNECT
JWT_SECRET



# API Documentation

## Admin Endpoints

### Register a New Admin
**POST** `/admin/register`

Registers a new admin.

#### Request Parameters
- **name** *(String)*: Name of the admin (minimum 5 characters).
- **email** *(String)*: Email of the admin (must be a valid email).
- **password** *(String)*: Password of the admin (minimum 5 characters).

#### Success Response
- **result** *(Object)*: The created admin object.

#### Error Response
- **errors** *(Object[])*: List of validation errors.

#### Example Request
```env

{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123"
}
```

---

### Login an Admin
**POST** `/admin/login`

Logs in an admin.

#### Request Parameters
- **email** *(String)*: Email of the admin (must be a valid email).
- **password** *(String)*: Password of the admin (minimum 5 characters).

#### Success Response
- **token** *(String)*: JWT token for the authenticated admin.

#### Error Response
- **errors** *(Object[])*: List of validation errors.

#### Example Request
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

---

### Logout an Admin
**GET** `/admin/logout`

Logs out an admin.

#### Success Response
- **message** *(String)*: Success message.

#### Error Response
- **message** *(String)*: Error message.

---

## Venue Endpoints

### Add a New Venue
**POST** `/venue/add-entries`

Adds a new venue.

#### Request Parameters
- **name** *(String)*: Name of the venue (minimum 5 characters).
- **address** *(String)*: Address of the venue (minimum 5 characters).
- **city** *(String)*: City of the venue (minimum 3 characters).
- **state** *(String)*: State of the venue (minimum 3 characters).
- **pin** *(Number)*: Pin code of the venue (6 digits).
- **line** *(String)*: Short description of the venue (minimum 5 characters).
- **elaborated** *(String)*: Detailed description of the venue (minimum 5 characters).
- **indianAdult** *(Number)*: Fare for Indian adults.
- **indianChild** *(Number)*: Fare for Indian children.
- **foreignAdult** *(Number)*: Fare for foreign adults.
- **foreignChild** *(Number)*: Fare for foreign children.
- **openingHours** *(Number)*: Opening hour (0-23).
- **openingMinute** *(Number)*: Opening minute (0-59).
- **closingHours** *(Number)*: Closing hour (0-23).
- **closingMinute** *(Number)*: Closing minute (0-59).
- **workingDays** *(String[])*: Working days of the venue (array of days).
- **typeofVenue** *(String)*: Type of the venue (Museum, Monuments, Urban_Attraction).
- **imgLink** *(String)*: Image link of the venue (must be a valid URL).
- **phNo** *(String)*: Phone number of the venue (10 digits).
- **email** *(String)*: Email of the venue.

#### Success Response
- **result** *(Object)*: The created venue object.

#### Error Response
- **errors** *(Object[])*: List of validation errors.

#### Example Request
To add a new venue, you need to upload an image file along with the following JSON data:

```json
{
  "name": "Museum Example",
  "address": "123 Museum St",
  "city": "Museum City",
  "state": "Museum State",
  "pin": 123456,
  "line": "A short description",
  "elaborated": "A detailed description",
  "indianAdult": 100,
  "indianChild": 50,
  "foreignAdult": 200,
  "foreignChild": 100,
  "openingHours": 9,
  "openingMinute": 0,
  "closingHours": 9,
  "closingMinute": 0,
  "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "typeofVenue": "Museum",
  "phNo": "1234567890",
  "email": "contact@museopass.com"
}
```

The image file should be included in the request as a multipart/form-data field named `image`. The image will be uploaded directly to AWS.

