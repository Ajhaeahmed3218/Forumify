

const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="text-center mx-auto md:w-3/12 w-2/3 my-8">
            <p className="text-[#6489f5] italic text-xl mb-2">---{subHeading}---</p>
            <h3 className="text-black  lg:text-3xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;