export type MetaProps = {
  page: number;
  limit: number;
  total: number;
};

export type ResponseSuccessProps = {
  data?: any;
  meta?: MetaProps;
};

export type ParamsProps ={
  params: {
    id: string;
  };
}


export interface childrenProps {
  children: React.ReactNode;
}

export type AuthProps = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type envProps = string | undefined