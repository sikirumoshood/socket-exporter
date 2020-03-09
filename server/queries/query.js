const q = {
    getApplications: `
        SELECT 
            *
        FROM 
            applications
        OFFSET 
            $1
        LIMIT 
            $2;
    
    `,
    getApplicationsCount: `
        SELECT 
            COUNT (*) as count 
        FROM 
            applications;
    `
}

module.exports = q;