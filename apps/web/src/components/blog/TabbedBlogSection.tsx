"use client";

import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { Blog8, type Blog8Post } from "@/components/ui/blog8";
import { Flame, TrendingUp, Sparkles } from "lucide-react";

interface TabbedBlogSectionProps {
  peoplesChoice: Blog8Post[];
  top: Blog8Post[];
  newest: Blog8Post[];
}

export function TabbedBlogSection({ peoplesChoice, top, newest }: TabbedBlogSectionProps) {
  return (
    <div className="max-w-7xl mx-auto w-full px-4">
      <Tabs defaultValue="peoples-choice">
        <div className="border-b border-[var(--color-border)]">
          <TabsList variant="underline" className="gap-x-2">
            <TabsTab value="peoples-choice" className="flex items-center gap-2 text-sm font-semibold px-3">
              <Flame size={15} />
              People&apos;s Choice
            </TabsTab>
            <TabsTab value="top" className="flex items-center gap-2 text-sm font-semibold px-3">
              <TrendingUp size={15} />
              GOAT
            </TabsTab>
            <TabsTab value="newest" className="flex items-center gap-2 text-sm font-semibold px-3">
              <Sparkles size={15} />
              Newest
            </TabsTab>
          </TabsList>
        </div>

        <TabsPanel value="peoples-choice">
          <Blog8 posts={peoplesChoice.length > 0 ? peoplesChoice : undefined} />
        </TabsPanel>
        <TabsPanel value="top">
          <Blog8 posts={top.length > 0 ? top : undefined} />
        </TabsPanel>
        <TabsPanel value="newest">
          <Blog8 posts={newest.length > 0 ? newest : undefined} />
        </TabsPanel>
      </Tabs>
    </div>
  );
}
