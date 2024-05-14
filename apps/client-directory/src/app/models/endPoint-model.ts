export interface EndPointModel {
  api: string;
  method: "POST" | "GET" | "DELETE" | "PATCH";
  param?: boolean;
  url: string;
}
