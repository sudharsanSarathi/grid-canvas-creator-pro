
const Footer = () => {
  return (
    <footer className="mt-12 py-6 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          GridForge — Design beautiful grid layouts with ease
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © {new Date().getFullYear()} GridForge
        </p>
      </div>
    </footer>
  );
};

export default Footer;
