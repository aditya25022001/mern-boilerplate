export const endpoints = [
    {
        method:"POST",
        route:"/api/auth/register",
        parameters:"body : JSON{name, email, password}",
        access:"Public",
        description:"A route for user to register"
    },
    {
        method:"POST",
        route:"/api/auth/login",
        parameters:"body : JSON{email, password}",
        access:"Public",
        description:"A route for user to login"
    },
    {
        method:"GET",
        route:"/api/profile",
        parameters:"headers : Authorization : Bearer token",
        access:"Private",
        description:"A route for user to get his/her profile"
    },
    {
        method:"PUT",
        route:"/api/profile/update",
        parameters:"headers : Authorization : Bearer token and body : JSON{name}",
        access:"Private",
        description:"A route for user to update his/her profile"
    },
    {
        method:"POST",
        route:"/api/recovery/sendOTP",
        parameters:"body : JSON{email}",
        access:"Public",
        description:"A route for user to get OTP for reseting password"
    },
    {
        method:"PUT",
        route:"/api/recovery/reset",
        parameters:"body : JSON{id,password}",
        access:"Public",
        description:"A route for user to reset password"
    },
    {
        method:"POST",
        route:"/api/profile/upload",
        parameters:"headers : Authorization : Bearer token and body : JSON{url}",
        access:"Private",
        description:"A route for user to upload/change profile pic"
    },
    {
        method:"GET",
        route:"/api/admin/users",
        parameters:"headers : Authorization : Bearer token",
        access:"Admin",
        description:"A route for admin to get all users"
    },
    {
        method:"DELETE",
        route:"/api/admin/delete/:id",
        parameters:"headers : Authorization : Bearer token and param : {id}",
        access:"Admin",
        description:"A route for admin to delete a user"
    },
    {
        method:"PUT",
        route:"/api/admin/update",
        parameters:"headers : Authorization : Bearer token and body : JSON{id, isAdmin}",
        access:"Admin",
        description:"A route for admin to update a user's admin rights"
    },
    {
        method:"POST",
        route:"/api/contact",
        parameters:"body : JSON{name, email, message}",
        access:"Public",
        description:"A route for user to make contact with the admin or project team"
    },
    {
        method:"GET",
        route:"/api/api/get",
        parameters:"none",
        access:"Public",
        description:"A route to get all api endpoints"
    },
    {
        method:"POST",
        route:"/api/api/add",
        parameters:"headers : Authorization : Bearer token and body : JSON{method, route, parameters, access, description}",
        access:"Admin",
        description:"A route for admin to add a api endpoint"
    },
    {
        method:"PUT",
        route:"/api/api/edit",
        parameters:"headers : Authorization : Bearer token and body : JSON{method, route, parameters, access, description}",
        access:"Admin",
        description:"A route for admin to edit an api endpoint"
    },
    {
        method:"DELETE",
        route:"/api/api/delete/:id",
        parameters:"headers : Authorization : Bearer token and params : { id }",
        access:"Admin",
        description:"A route for admin to delete a certain endpoint"
    },
]