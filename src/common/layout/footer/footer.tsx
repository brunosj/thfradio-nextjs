import { Props } from '@/types/PropsInterface';

const Footer = ({ children }: Props) => {
  return (
    <footer>
      <nav>{children}</nav>
    </footer>
  );
};

export default Footer;
