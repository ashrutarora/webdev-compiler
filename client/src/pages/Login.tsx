import "./pageStyles/grid.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const formSchema = z.object({
  userId: z.string().nonempty({ message: "Username or Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  function handleLogin(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div
      className="__login grid-bg w-full flex font-mono justify-center items-center"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div className="bg-slate-200 bg-opacity-5 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl pb-1 font-semibold font-serif text-left text-orange-500">
          Login
        </h2>
        <p className="text-left text-xl font-semibold  text-sky-500 pb-5">
          Welcome back fellow coder! 👨🏻‍💻
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-black border border-gray-600 ml-2 p-5 rounded-lg  text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                      placeholder="Username or Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-black border border-gray-600 ml-2 p-5 rounded-lg  text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-yellow-500 ml-2 hover:bg-yellow-700 text-lg text-black py-3 rounded-lg font-semibold transition duration-300"
              type="submit"
            >
              Login
            </Button>
            <div className="text-center mt-4">
              <p className="text-gray-400 ">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
