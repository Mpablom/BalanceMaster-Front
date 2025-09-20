export interface Movement {
  id: number;
  date: string;
  description: string;
  amount: number;
  movementType: "CREDIT" | "DEBIT";
}
