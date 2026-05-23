'use client';

export const Loader = () => {
  return (
    <div
      className='w-[50px] p-2 aspect-square rounded-full bg-red-500 animate-spin'
      style={{
        WebkitMask:
          'conic-gradient(#0000 0%, #000), linear-gradient(#000 0 0) content-box',
        mask: 'conic-gradient(#0000 0%, #000), linear-gradient(#000 0 0) content-box',
        WebkitMaskComposite: 'source-out',
        maskComposite: 'subtract',
      }}
    />
  );
};
