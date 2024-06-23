import { Button } from "@/components/ui/button";
import { isRedditFieldEmpty } from "@/lib/database/actions/user";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    const isEmpty = await isRedditFieldEmpty(userId);

    return <div>dw</div>;
  } else {
    return (
      <div>
        <Button>Connect an account</Button>
      </div>
    );
  }
}
