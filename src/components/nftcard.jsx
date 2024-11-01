const NftCard = ({ image, id, title, address }) => {
  return (
    <div className="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md">
      <img className="w-full rounded-t-md" key={id} src={image}></img>
      <div className="p-3">
        <div className="flex mb-3">
          <div className="flex-grow">
            <h3 className="text-xl">{title}</h3>
            <p>{id}</p>
          </div>
          <div className="flex mr-3">
            <a
              target="_blank"
              className="text-blue-700"
              href={`https://testnet.snowtrace.io/address/${address}`}
            >{`${address.slice(0, 4)}...${address.slice(
              address.length - 4
            )}`}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
