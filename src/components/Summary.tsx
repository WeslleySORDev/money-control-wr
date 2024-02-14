import { useTransactions } from "../hooks/useTransactions";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export function Summary() {
  const { transactions } = useTransactions();
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "Income") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );
  return (
    <div className="flex gap-8">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Entradas</CardTitle>
        </CardHeader>
        <CardContent>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Saidas</CardTitle>
        </CardHeader>
        <CardContent>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.withdraws)}
        </CardContent>
      </Card>
      <Card
        className={`flex-1 ${
          summary.total >= 0
            ? "bg-[rgba(18,_164,_84,0.3)]"
            : "bg-[rgba(229,_46,_77,_0.3)]"
        }`}
      >
        <CardHeader>
          <CardTitle>Total</CardTitle>
        </CardHeader>
        <CardContent>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </CardContent>
      </Card>
    </div>
  );
}
