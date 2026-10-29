import { SVGFollower } from "@/components/ui/svg-follower";

export default function DemoOne() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SVGFollower
        colors={["#ff6b6b", "#fff200", "#45b7d1", "#96ceb4", "#ffeaa7"]}
      />
    </div>
  );
}
