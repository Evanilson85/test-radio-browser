interface IPROPSHEADERTEXT {
  title: string;
}

export const HeaderText = ({ title }: IPROPSHEADERTEXT) => {
  return <h1 className="text-white text-[24px] font-semibold">{title}</h1>;
};
