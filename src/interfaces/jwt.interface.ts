export interface JwtUserPayload {
  id: string;
  admin?: boolean;
  exp?: number;
}
