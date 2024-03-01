import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const SigninCard = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <article className="flex flex-col border max-w-96 p-5 rounded-lg mx-auto gap-5">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Sign in
        </h4>
        <form className="flex flex-col gap-5">
          <section>
            <Label htmlFor="email">Email or mobile phone number</Label>
            <Input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              placeholder="example@gmail.com"
            />
          </section>
          <Button size="sm" type="submit">
            Continue
          </Button>
        </form>
        <section className="flex flex-col gap-5 border-b">
          <p className="text-xs">
            By continuing, you agree to Amazon's{" "}
            <a className="text-sky-700" href="#">
              Conditions of Use{" "}
            </a>
            and{" "}
            <a className="text-sky-700" href="#">
              Privacy Notice
            </a>
            .
          </p>
          <Collapsible className="mb-5">
            <CollapsibleTrigger className="flex items-center text-sm">
              <MdExpandMore className="text-black" />
              <a className="hover:text-orange-500">
                <span className="text-sky-700">Need help?</span>
              </a>
            </CollapsibleTrigger>
            <CollapsibleContent className="text-sm px-[14px] flex flex-col">
              <a className="text-sky-700" href="#">
                Forgot password?
              </a>
              <a className="text-sky-700" href="#">
                Other issues with Sign-In
              </a>
            </CollapsibleContent>
          </Collapsible>
        </section>
        <section className=" text-sm font-semibold">
          <p>Buying for work?</p>
          <a className="text-sky-700" href="#">
            Shop on Amazon Business
          </a>
        </section>
      </article>
      <section className="max-w-96 mx-auto">
        <div className="relative">
          <span className="absolute w-full border-t bg-black mt-6">
            <div className="flex justify-center items-center">
              <span className="bg-white text-xs text-muted-foreground absolute -bottom-2">
                New to Amazon?
              </span>
            </div>
          </span>
        </div>
      </section>
      <section className="flex justify-center max-w-96 mx-auto mt-12">
        <Button className="w-full" variant="outline">
          <Link to="signup"> Create your Amazon Account</Link>
        </Button>
      </section>
    </>
  );
};

export default SigninCard;
