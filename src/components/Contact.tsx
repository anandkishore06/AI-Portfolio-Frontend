import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(
        "service_v9rmskp",
        "template_pfefom8",
        templateParams,
        "552ofr6f0_vNsFa88"
      );

      toast.success("Message sent successfully! I will get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-teal to-amber mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Have a project in mind, an opportunity to discuss, or just want to connect? Send a note or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Info Left */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              Contact Information
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              I usually reply within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center border border-teal/20 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Call Me</div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  +91 7070382594
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber/10 text-amber flex items-center justify-center border border-amber/20 flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Email Me</div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 break-all">
                  anandkishore060@gmail.com
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Location</div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Kolkata, India
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
            <h4 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-3">
              Social Profiles
            </h4>
            <div className="flex gap-2">
              <a
                href="https://github.com/anandkishore06"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-teal hover:border-teal/40 border border-zinc-200 dark:border-zinc-700 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/anandkishore060/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-teal hover:border-teal/40 border border-zinc-200 dark:border-zinc-700 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/anandkishore06"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-teal hover:border-teal/40 border border-zinc-200 dark:border-zinc-700 transition-colors"
                aria-label="Twitter / X"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Form Right */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Name <span className="text-teal">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm placeholder:text-zinc-400 focus-visible:ring-teal"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Email <span className="text-teal">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@domain.com"
                  className="rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm placeholder:text-zinc-400 focus-visible:ring-teal"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                className="rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm placeholder:text-zinc-400 focus-visible:ring-teal"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Message <span className="text-teal">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm placeholder:text-zinc-400 focus-visible:ring-teal min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal hover:bg-teal/90 text-zinc-950 font-semibold text-xs sm:text-sm shadow-xs transition-all duration-200 active:scale-97",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
