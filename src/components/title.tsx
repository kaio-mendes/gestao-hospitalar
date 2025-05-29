interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return <h1 style={{ marginLeft: '2rem' }}>{title}</h1>;
};
