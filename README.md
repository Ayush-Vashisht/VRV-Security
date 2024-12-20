# Role-Based Access Control (RBAC) UI



This project is a Role-Based Access Control (RBAC) User Interface designed to demonstrate user management, role management, and permission handling in a secure and user-friendly manner. The system allows administrators to efficiently manage users, define roles, and assign permissions dynamically. It is a flexible and customizable solution that showcases both creativity and technical skills.
## Features

**1. User Management**

*View Users*:  Display a list of all users with their details (e.g., name, email, role, status).

*Add Users*:  Add new users with relevant information and assign roles.

*Edit Users*:  Modify existing user details, including their assigned roles and status.

*Delete Users*:  Remove users from the system securely.

*Status Management*:  Toggle user status (Active/Inactive).

**2. Role Management**
*Create Roles*:  Define new roles with associated permissions.

*Edit Roles*:  Update roles by modifying their name, description, or associated permissions.

*Delete Roles*:  Remove roles from the system (with checks to ensure no associated users lose access).

**3. Dynamic Permissions**
*Permission Assignment*:  Assign permissions (e.g., Read, Write, Delete) to roles dynamically.

*Permission Display*:  Clearly visualize assigned permissions for each role for easier management.

*Custom Attributes*:  Extend roles with additional attributes if required.
## Getting Started
To get started with the project, clone this repository and install the necessary dependencies.

**Clone the Repository**

    https://github.com/Ayush-Vashisht/VRV-Security

    cd vrv security

**Install Dependencies Make sure you have Node.js installed, then run:**

    npm install

    yarn install

**Run the Application To start the app, run:**

    npm run dev

    yarn run dev
    
This will start the app in development mode. Open http://localhost:3000 in your browser to see the application.
## How to Use

**User Management**

1.  Navigate to the User Management page.
2. View a table listing all users, their roles, and statuses.
3. Use the Add User button to create new users and assign them roles.
4. Edit user information or change their role by clicking the Edit button next to the user.
5. Delete users using the Delete button.

**Role Management**

1. Navigate to the Role Management page.
2. Create a new role using the Add Role button and assign permissions.
3. Edit an existing role by clicking the Edit button next to it.
4. Delete roles (ensure no associated users lose access).

**Permissions**

1. Assign permissions to roles from the Role Management page.
2. View all permissions associated with a role in a clear, tabular format.
## Future Enhancements

- *Search and Filter*: Add advanced search and filtering capabilities for users and roles.
- *Audit Logs*: Track and display changes made to roles, users, and permissions.
- *Integration with Backen*: Replace mock APIs with real backend services.
- *RBAC Tree View*: Visualize role-permission relationships as a hierarchy.
