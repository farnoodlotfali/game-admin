import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import logo from "@/assets/img/controller/controller.png";
import Shape1 from "@/assets/svgs/shape1.svg";
import Shape2 from "@/assets/svgs/shape2.svg";
import Shape3 from "@/assets/svgs/shape3.svg";
import Shape6 from "@/assets/svgs/shape4.svg";
import Shape4 from "@/assets/svgs/shape5.svg";
import Shape5 from "@/assets/svgs/shape6.svg";
import { FormInputs } from "@/components/form";
import { LoadingButton } from "@/components/loading-button";
import { Form } from "@/components/ui/form";
import { INPUT_TYPES } from "@/constants/input-types";
import type { FormInputsType } from "@/types/form-inputs-type";

const schema = z.object({
  email: z.string().min(2),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

const Login = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Email",
      name: "email",
      props: { placeholder: "jhon@gmail.com" },
    },
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Password",
      name: "password",
      props: { type: "password", placeholder: "Password" },
    },
  ];

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center"
      style={{
        background: "radial-gradient(circle, #0f0f0f 0%, #000000 100%)",
      }}
    >
      {/* Floating shapes */}
      <img
        src={Shape1}
        alt="Shape 1"
        className="animate-float absolute top-20 left-14 z-20 hidden w-32 opacity-40 md:block"
      />
      <img
        src={Shape2}
        alt="Shape 2"
        className="animate-float absolute top-1/3 right-10 z-20 hidden w-28 opacity-40 md:block"
      />
      <img
        src={Shape3}
        alt="Shape 3"
        className="animate-bounce-slow absolute bottom-1/5 left-1/5 z-20 hidden w-28 opacity-40 md:block"
      />
      <img
        src={Shape4}
        alt="Shape 4"
        className="animate-bounce-slow absolute right-1/3 bottom-14 z-20 hidden w-32 opacity-80 md:block"
      />
      <img
        src={Shape5}
        alt="Shape 5"
        className="animate-bounce-slow absolute bottom-1/2 left-1/6 z-20 hidden w-32 opacity-80 md:block"
      />
      <img
        src={Shape6}
        alt="Shape 6"
        className="animate-bounce-slow absolute top-1/5 right-1/6 z-20 hidden w-28 opacity-40 md:block"
      />

      {/* Outer glass container */}
      <div className="relative flex min-h-[750px] w-[75%] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 shadow-xl backdrop-blur-xl md:p-8">
        {/* Background glow effects */}
        <div className="absolute inset-0 -z-10">
          <div className="animate-spin-slow absolute top-10 left-10 h-24 w-24 rounded-full bg-gradient-to-r from-purple-600 to-purple-900 opacity-30 blur-xl"></div>
          <div className="animate-spin-slow absolute top-1/4 right-10 h-20 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 opacity-25 blur-xl"></div>
          <div className="animate-spin-slow absolute bottom-20 left-1/5 h-28 w-28 rounded-full bg-gradient-to-r from-teal-500 to-green-700 opacity-20 blur-xl"></div>
          <div className="animate-spin-slow absolute right-1/4 bottom-10 h-16 w-16 rounded-full bg-gradient-to-r from-gray-600 to-gray-900 opacity-25 blur-xl"></div>
        </div>

        {/* Inner card */}
        <div
          className="relative w-[30rem] max-w-[450px] rounded-2xl bg-white/5 py-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-[20px] md:py-12"
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05), inset 0 0 20px 10px rgba(255,255,255,0.02)",
          }}
        >
          <div
            className="pointer-events-none absolute top-0 left-0 h-[1px] w-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute top-0 left-0 h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05))",
            }}
          />

          <div className="flex flex-col items-start justify-center gap-5 px-5 md:px-10">
            <img
              src={logo}
              alt="Game Admin logo"
              className="aspect-square size-16 self-center rounded-lg"
            />
            <h2 className="py-4 text-lg font-semibold md:text-2xl">Login</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                <FormInputs control={form.control} inputs={inputs} className="md:grid-cols-1" />
                <div className="flex justify-start">
                  <LoadingButton type="submit">Login</LoadingButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
