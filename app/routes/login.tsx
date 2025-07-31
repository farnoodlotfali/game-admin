import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import logo from "@/assets/img/controller/controller.png";
import Shape1 from "@/assets/svgs/shape1.svg";
import Shape2 from "@/assets/svgs/shape2.svg";
import Shape3 from "@/assets/svgs/shape3.svg";
import Shape4 from "@/assets/svgs/shape4.svg";
import { FormInputs } from "@/components/form";
import { LoadingButton } from "@/components/loading-button";
import { Form } from "@/components/ui/form";
import { INPUT_TYPES } from "@/constants/input-types";
import type { FormInputsType } from "@/types/form-inputs-type";

export function meta() {
  return [
    { title: "Login" },
    {
      name: "description",
      content: "Browse and manage games list.",
    },
  ];
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

const Login = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // const createPublisherMutation = useCreatePublisher();

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Email",
      name: "email",
      props: {
        placeholder: "jhon@gmail.com",
      },
    },

    {
      inputType: INPUT_TYPES.TEXT,
      label: "Password",
      name: "password",
      props: {
        type: "password",
        placeholder: "Password",
      },
    },
  ];

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center"
      style={{
        background: "radial-gradient(circle, #0085FF 0%, #003465 100%)",
      }}
    >
      <img
        src={Shape1}
        alt="Shape 1"
        className="animate-float absolute top-20 left-14 z-20 w-32 opacity-70"
      />
      <img
        src={Shape2}
        alt="Shape 2"
        className="animate-spin-slow absolute top-1/3 right-10 z-20 w-28 opacity-60"
      />
      <img
        src={Shape3}
        alt="Shape 3"
        className="animate-float-delayed absolute bottom-16 left-1/4 z-20 w-36 opacity-50"
      />
      <img
        src={Shape4}
        alt="Shape 4"
        className="animate-bounce-slow absolute right-1/3 bottom-8 z-20 w-32 opacity-40"
      />
      <img
        src={Shape4}
        alt="Shape 5"
        className="animate-bounce-slow absolute bottom-40 left-1/6 z-20 w-32 opacity-40"
      />

      <div
        className="relative flex min-h-[700px] w-[70%] items-center justify-center rounded-2xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-xl"
        style={{
          background: "radial-gradient(circle, #0085FF 0%, #003465 100%)",
        }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="animate-spin-slow absolute top-10 left-10 h-24 w-24 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 opacity-50 blur-xl"></div>
          <div className="animate-spin-slow absolute top-1/4 right-10 h-20 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60 blur-xl"></div>
          <div className="animate-spin-slow absolute bottom-20 left-1/3 h-28 w-28 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 opacity-50 blur-xl"></div>
          <div className="animate-spin-slow absolute right-1/4 bottom-10 h-16 w-16 rounded-full bg-gradient-to-r from-blue-300 to-cyan-400 opacity-50 blur-xl"></div>
        </div>

        <div
          className="relative w-[30rem] max-w-[450px] rounded-2xl bg-white/10 p-4 text-white shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[20px] md:p-12"
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 20px 10px rgba(255,255,255,0.2)",
          }}
        >
          <div
            className="pointer-events-none absolute top-0 left-0 h-[1px] w-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute top-0 left-0 h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.6), transparent, rgba(255,255,255,0.2))",
            }}
          />

          <div className="flex flex-col items-start justify-center gap-5 px-5 md:px-10">
            <img
              src={logo}
              alt="Game Admin logo "
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
