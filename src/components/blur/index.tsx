import React from "react"

interface IPROPSBLUR extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Blur = ({ children, ...props }: IPROPSBLUR) => {
return (
  <>
    <div className='h-full bg-[#4D4D56] blur-xl absolute w-full rounded-xl' ></div>
    <div className='relatize z-50' {...props}>
      {children}
    </div>
  </>
)
}