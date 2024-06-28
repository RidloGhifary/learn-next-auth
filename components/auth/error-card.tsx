import { CardWrapper } from "./card-wrapper";
import { TriangleAlert } from "lucide-react";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login">
      <div className="w-full flex justify-center items-center">
        <TriangleAlert className="text-destructive" />
      </div>
    </CardWrapper>
  );
}
