// SELECT USER

export function selectUserById(userId) {
  const query = `SELECT * FROM wp_users WHERE ID='${userId}'`;
  return query;
}

export function selectUserByEmail(userEmail) {
  const query = `SELECT * FROM wp_users WHERE user_email='${userEmail}'`;
  return query;
}

// select x number of users

export function selectUsers(numberOfUsers, pageNum) {
  const query = `SELECT *
                        FROM wp_users 
                        ORDER BY ID DESC
                        LIMIT ${numberOfUsers}
                        OFFSET ${pageNum ? (pageNum - 1) * numberOfUsers : 0}
                        `;
  return query;
}

// INSERT USER

export function insertUser(body) {
  const {
    ID,
    user_login,
    user_nicename,
    user_registered,
    display_name,
    user_email,
    user_status,
    user_pass,
  } = body;

  const query = `INSERT INTO wp_users
                        (
                            user_login,
                            user_nicename,
                            user_registered,
                            display_name,
                            user_email,
                            user_status,
                            user_pass  
                        ) 
                        VALUES
                        (
                            '${user_login}',
                            '${user_nicename}',
                            '${user_registered}',
                            '${display_name}',
                            '${user_email}',
                            '${user_status}',
                            '${user_pass}'
                        );`;
  return query;
}

export function updateUser(body) {
  const { ID, display_name, user_email, user_status, user_pass } = body;

  const query = `
                        UPDATE wp_users
                        SET display_name='${display_name}',
                            user_email='${user_email}',
                            user_status='${user_status}',
                            user_pass='${user_pass}'
                        WHERE ID='${ID}'
                        `;
  return query;
}
