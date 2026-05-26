import { useEffect } from "react";
import { supabase } from "@/supabase/client";

export default function TestPage() {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await supabase
      .from("properties")
      .select("*");

    console.log(data);
    console.log(error);
  }

  return (
    <div className="p-10">
      Test Supabase Connection
    </div>
  );
}