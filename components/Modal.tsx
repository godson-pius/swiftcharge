"use client";

interface IProps {
  isOpen: boolean;
  useDefaultWidth?: boolean;
  // onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, useDefaultWidth, children }: IProps) {
  return (
    <>
      {/*<button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        open modal
      </button>*/}
      <dialog id="my_modal_2" className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div
          className={`modal-box ${!useDefaultWidth ? "w-full md:w-[800px]" : "w-[638px]"}`}
        >
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
