import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { Button } from "../ui/button";

const SignupCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  return (
    <main className="max-w-96 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3">
            <section className="grid gap-1">
              <Label htmlFor="name">Your name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder="First and last name"
              />
            </section>
            <section className="grid gap-1">
              <Label htmlFor="email_or_phone_number">
                Mobile number or email
              </Label>
              <Input
                type="email"
                id="email_or_phone_number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>
            <section className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
              <section className="flex items-center text-sm">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.67494 3.50017C5.67494 3.25164 5.87641 3.05017 6.12494 3.05017H10.6249C10.8735 3.05017 11.0749 3.25164 11.0749 3.50017C11.0749 3.7487 10.8735 3.95017 10.6249 3.95017H9.00587L7.2309 11.05H8.87493C9.12345 11.05 9.32493 11.2515 9.32493 11.5C9.32493 11.7486 9.12345 11.95 8.87493 11.95H4.37493C4.1264 11.95 3.92493 11.7486 3.92493 11.5C3.92493 11.2515 4.1264 11.05 4.37493 11.05H5.99397L7.76894 3.95017H6.12494C5.87641 3.95017 5.67494 3.7487 5.67494 3.50017Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Passwords must be at least 6 characters.</span>
              </section>
            </section>
            <section className="grid gap-1">
              <Label htmlFor="reenter_password">Re-enter password</Label>
              <Input
                type="password"
                id="reenter_password"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.currentTarget.value)}
              />
            </section>
            <Button type="submit">Continue</Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <section className="text-sm">
            By creating an account, you agree to Amazon's{" "}
            <a className="text-sky-700" href="#">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a className="text-sky-700" href="#">
              Privacy Notice
            </a>
            .
          </section>
          <div className="border-b my-5 w-full h-1"></div>
          <section className="grid gap-1 text-sm">
            <p className="font-bold">Buying for work?</p>
            <a className="text-sky-700" href="#">
              Create a free business account
            </a>
          </section>
          <div className="border-b my-5 w-full h-1"></div>
          <section className="text-sm flex gap-2">
            <span>Already have an account?</span>
            <Link className="text-sky-700 flex items-center" to="/form">
              Sign in
              <IoMdArrowDropright />
            </Link>
          </section>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignupCard;
