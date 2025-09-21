# Authentication & Registration Documentation

## რეგისტრაცია და ავტორიზაცია / Registration and Authentication

რეგისტრაცია და ავტორიზაცია წარმოდგენს ორ დამოუკიდებელ გვერდს:

Registration and authentication consists of two independent pages:

---

## 🔑 შესვლა (Login)

შესვლის გვერდზე მომხმარებელს შეუძლია ისარგებლოს ელფოსტით ან მომხმარებლის სახელითა და პაროლით.

On the login page, users can sign in using their email or username and password.

### შესვლის ველები / Login Fields:

- **Email** – სავალდებულოა, უნდა ჰგავდეს რეალურ იმეილს / Required, must be a valid email format
- **Password** – სავალდებულოა / Required

### ვალიდაციის წესები / Validation Rules:

- Email და Password უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს / Email and Password must contain at least 3 characters

---

## 📝 რეგისტრაცია (Registration)

რეგისტრაციის გვერდზე მოცემულია შემდეგი ველები:

The registration page contains the following fields:

| ველი / Field | სავალდებულო / Required | მოთხოვნები / Requirements |
|---------------|------------------------|---------------------------|
| **Username** | ✅ კი / Yes | უნიკალური, მინ. 3 სიმბოლო / Unique, min. 3 characters |
| **Email** | ✅ კი / Yes | უნიკალური, სწორი ელფოსტის ფორმატი / Unique, valid email format |
| **Password** | ✅ კი / Yes | მინიმუმ 3 სიმბოლო / Minimum 3 characters |
| **Confirm Password** | ✅ კი / Yes | უნდა ემთხვეოდეს Password ველს / Must match Password field |
| **Avatar** | ❌ არა / No | სურათი (ფორმატი: jpg, png და სხვა) / Image (formats: jpg, png, etc.) |

---

## შენიშვნები / Notes:

### უნიკალურობის შემოწმება / Uniqueness Validation:
- Username და Email უნიკალურობა მოწმდება ბექენდში, წინასწარ მოცემულ API-ზე / Username and Email uniqueness is checked on the backend using a pre-provided API
- არასწორი ან უკვე გამოყენებული მნიშვნელობის შეყვანის შემთხვევაში უნდა აჩვენოთ API-დან წამოსული შესაბამი შეტყობინება / When entering incorrect or already used values, the corresponding message from the API should be displayed

### Avatar ატვირთვა / Avatar Upload:
- Avatar-ის ატვირთვის შემთხვევაში აპლიკაცია უნდა აჩვენებდეს მის პრევიუს (preview) / When uploading an Avatar, the application should display its preview

---

## Implementation Details

### Current Implementation Status:
- ✅ Login form with email and password fields
- ✅ Registration form with all required fields
- ✅ Password visibility toggle functionality
- ✅ Profile picture upload with preview
- ✅ Form validation for required fields
- ✅ Responsive design matching the provided mockup
- ✅ Orange color scheme matching the design

### Implementation Status:
- ✅ Login form with email and password fields
- ✅ Registration form with all required fields
- ✅ Password visibility toggle functionality
- ✅ Profile picture upload with preview
- ✅ Form validation for required fields
- ✅ Email format validation
- ✅ Minimum character length validation (3 characters)
- ✅ Password confirmation validation
- ✅ Error message display with red borders
- ✅ Responsive design matching the provided mockup
- ✅ Orange color scheme matching the design

### Implementation Status:
- ✅ Login form with email and password fields
- ✅ Registration form with all required fields
- ✅ Password visibility toggle functionality
- ✅ Profile picture upload with preview
- ✅ Form validation for required fields
- ✅ Email format validation
- ✅ Minimum character length validation (3 characters)
- ✅ Password confirmation validation
- ✅ Error message display with red borders
- ✅ Responsive design matching the provided mockup
- ✅ Orange color scheme matching the design
- ✅ Server actions for authentication and registration
- ✅ Real-time email and username uniqueness validation
- ✅ Loading states and user feedback
- ✅ TypeScript types for all authentication data
- ✅ Mock API integration with simulated delays

### Next Steps for Full Implementation:
- [ ] Replace mock API functions with actual backend endpoints
- [ ] Implement session management and cookies
- [ ] Add password hashing and security measures
- [ ] Add email verification functionality
- [ ] Add password reset functionality

### File Structure:
```
app/
├── (auth)/
│   ├── layout.tsx          # Shared layout with background image
│   ├── sign-in/
│   │   └── page.tsx        # Login form implementation
│   └── sign-up/
│       └── page.tsx        # Registration form implementation
├── (root)/
│   └── page.tsx            # Dashboard/home page
lib/
└── auth.ts                 # Server actions and validation
```

### Server Actions Implementation:
- **`signInAction`**: Handles user authentication with email/password validation
- **`signUpAction`**: Handles user registration with full validation and uniqueness checks
- **`checkEmailAction`**: Real-time email uniqueness validation
- **`checkUsernameAction`**: Real-time username uniqueness validation
- **Mock API functions**: Simulate backend calls with realistic delays
- **Comprehensive validation**: Email format, password matching, character length requirements

### Dependencies Used:
- Next.js 15.5.3
- React 19.1.0
- TypeScript
- Tailwind CSS
- React Icons
- Zod (for validation - ready to install)
