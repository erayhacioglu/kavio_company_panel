import React from "react";
import {
  Eye, Share2, Phone, Mail, Globe, Send,
  Linkedin, Instagram, Facebook, Twitter
} from "lucide-react";

export default function HistoryIcon({ type, platform }) {
  if (type === "PROFILE_VIEW") return <Eye className="hicon" />;
  if (type === "SOCIAL_CLICK") {
    switch ((platform || "").toLowerCase()) {
      case "linkedin": return <Linkedin className="hicon" />;
      case "instagram": return <Instagram className="hicon" />;
      case "facebook": return <Facebook className="hicon" />;
      case "twitter": return <Twitter className="hicon" />;
      case "web": return <Globe className="hicon" />;
      default: return <Share2 className="hicon" />;
    }
  }
  if (type === "CONTACT_VIEW") return <Mail className="hicon" />;
  if (type === "CONTACT_REQUEST_SENT") return <Send className="hicon" />;
  return <Share2 className="hicon" />;
}
