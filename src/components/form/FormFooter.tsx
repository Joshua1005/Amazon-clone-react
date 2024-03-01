const FormFooter = () => {
  return (
    <footer className="w-full border-t mt-5 p-5">
      <article className="max-w-96 mx-auto flex flex-col gap-5">
        <section className="flex justify-around items-center text-sky-600 text-xs">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </section>
        <p className="text-xs text-muted-foreground text-center">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </article>
    </footer>
  );
};

export default FormFooter;
