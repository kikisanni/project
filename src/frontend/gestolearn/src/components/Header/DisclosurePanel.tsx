import { Disclosure } from "@headlessui/react";
import { navigation } from "./navigation";
import classNames from "./ClassNames";

export default function DisclosurePanel() {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              item.current
                ? "bg-blue-300"
                : " hover:bg-purple-300 ",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  );
}
