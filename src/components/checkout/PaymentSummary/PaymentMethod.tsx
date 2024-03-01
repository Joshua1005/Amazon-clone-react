import { CardStackIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { FaPaypal, FaApple } from "react-icons/fa";
import { useEffect, useRef } from "react";

type PaymentMethodProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const PaymentMethod = ({ isOpen, setIsOpen }: PaymentMethodProps) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const startYear = 2024;
  const endYear = 2050;

  useEffect(() => {
    if (isOpen && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isOpen]);

  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index;
    return (
      <SelectItem key={year} value={year.toString()}>
        {year}
      </SelectItem>
    );
  });
  return (
    <div className="flex items-center justify-center w-full">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Add a new payment method to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup className="gap-4 grid-cols-3">
            <div>
              <RadioGroupItem hidden id="card" value="card"></RadioGroupItem>
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <CardStackIcon className="mb-3 h-6 w-6" />
                Card
              </Label>
            </div>
            <div>
              <RadioGroupItem
                hidden
                id="paypal"
                value="paypal"
              ></RadioGroupItem>
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <FaPaypal className="mb-3 h-6 w-6" />
                Paypal
              </Label>
            </div>
            <div>
              <RadioGroupItem hidden id="apple" value="apple"></RadioGroupItem>
              <Label
                htmlFor="apple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <FaApple className="mb-3 h-6 w-6" />
                Apple
              </Label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input id="card_name" ref={nameRef} placeholder="First Last" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card_number">Card number</Label>
            <Input id="card_number" name="card_number" type="text" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Expires</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="june">June</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="august">August</SelectItem>
                    <SelectItem value="september">September</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                    <SelectItem value="november">November</SelectItem>
                    <SelectItem value="december">December</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Year</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>{years}</SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card_cvc">CVC</Label>
              <Input
                id="card_cvc"
                type="text"
                name="card_cvc"
                placeholder="CVC"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col gap-2">
            <Button onClick={() => setIsOpen(false)}>Continue</Button>
            <Button
              className="bg-foreground text-white hover:bg-foreground"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentMethod;
