const Testimonials = () => {
  // Testimonials
  const testimonialItems = [
    {
      initials: "JD",
      name: "John Doe",
      role: "Day Trader",
      quote:
        "This trading journal has completely transformed how I track my trades. The insights have helped me improve my win rate by 15%.",
    },
    {
      initials: "AS",
      name: "Alice Smith",
      role: "Swing Trader",
      quote:
        "I've tried several trading journals, but this one stands out with its intuitive interface and powerful analytics. Highly recommended!",
    },
    {
      initials: "RJ",
      name: "Robert Johnson",
      role: "Long-term Investor",
      quote:
        "Even as a long-term investor, this journal has been invaluable for tracking my portfolio performance and making better investment decisions.",
    },
  ];

  return (
    <div className="bg-[#e6edf5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-extrabold text-[#161616] text-center">
          Trusted by traders worldwide
        </h2>
        <div className="grid gap-8 mt-12 md:grid-cols-3">
          {testimonialItems.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                  <span className="text-xl font-bold text-gray-700">
                    {testimonial.initials}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#161616]">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
