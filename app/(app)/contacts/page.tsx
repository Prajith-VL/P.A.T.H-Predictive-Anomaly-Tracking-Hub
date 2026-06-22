"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { usePath } from "@/lib/store";
import { ContactCard } from "@/components/brand/ContactCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, UserPlus, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContactsPage() {
  const router = useRouter();
  const { contacts, addContact, removeContact } = usePath();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", relationship: "" });

  const handleAdd = () => {
    if (formData.name && formData.phone && formData.relationship) {
      addContact(formData);
      setFormData({ name: "", phone: "", relationship: "" });
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="-ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold">Trusted Contacts</h1>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost" disabled={contacts.length >= 3}>
              <UserPlus className="h-5 w-5 text-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Trusted Contact</DialogTitle>
              <DialogDescription>
                Add up to 3 contacts who will receive your ride details and SOS alerts.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Amit Sharma"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  placeholder="e.g. Father, Friend"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Save Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3"
        >
          <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Trusted contacts receive a live tracking link when you start a ride, and are instantly notified if you trigger an SOS.
          </p>
        </motion.div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Your Contacts
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            {contacts.length} / 3 added
          </span>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <ContactCard contact={contact} onRemove={() => removeContact(contact.id)} />
            </motion.div>
          ))}
          {contacts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No trusted contacts added yet.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
