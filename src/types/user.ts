
export type user = {
          username: string;
          avatar: string;
          role: string;
          status: 'inactive' | 'active' | 'banned'; 
          created_at?: Date;
          }
          