"use client";

import type { TrustedContact } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Trash2 } from "lucide-react";

export function ContactCard({
  contact,
  onRemove,
}: {
  contact: TrustedContact;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
      <Avatar className="h-10 w-10">
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{contact.name}</p>
        <p className="text-xs text-muted-foreground">
          {contact.relationship} · {contact.phone}
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={onRemove} className="text-muted-foreground hover:text-destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
