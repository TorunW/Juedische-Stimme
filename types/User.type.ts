export type User = {
  ID?: number;
  user_login?: string;
  user_pass: string;
  current_password?: string;
  user_nicename?: string;
  user_email: string;
  user_registered: number | string;
  user_status: number;
  display_name: string;
};
