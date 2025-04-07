import { createStore } from "solid-js/store";
import { IPAddress,IPStore,Host } from "../lib/types";
import { createSignal } from "solid-js";

// create a global store for Ip address and hostname
export const [internalStore, setInternalStore] = createStore<IPStore[]>([]);
setInternalStore([
  {
    id: 1,
    ip: "255.255.255.255" as IPAddress,
    hostname: ["example.com", "localhost"] as Host[],
    checked: false
  },
  {
    id: 2,
    ip: "8.8.8.8" as IPAddress,
    hostname: ["dns.google", "google-public-dns-a.google.com"] as Host[],
    checked: false
  },
  {
    id: 3,
    ip: "1.1.1.1" as IPAddress,
    hostname: ["cloudflare-dns.com", "cloudflare-dns"] as Host[],
    checked: false
  },
  {
    id: 4,
    ip: "208.67.222.222" as IPAddress,
    hostname: ["opendns.com", "opendns"] as Host[],
    checked: false
  },
  {
    id: 5,
    ip: "4.2.2.2" as IPAddress,
    hostname: ["level3-dns.com", "level3-dns"] as Host[],
    checked: false
  },
  {
    id: 6,
    ip: "208.67.220.220" as IPAddress,
    hostname: ["opendns-home.com", "opendns-home"] as Host[],
    checked: false
  },
  {
    id: 7,
    ip: "8.26.56.26" as IPAddress,
    hostname: ["comcast-dns.com", "comcast-dns"] as Host[],
    checked: false
  },
  {
    id: 8,
    ip: "209.18.47.61" as IPAddress,
    hostname: ["norton-dns.com", "norton-dns"] as Host[],
    checked: false
  },
  {
    id: 9,
    ip: "8.8.4.4" as IPAddress,
    hostname: ["dns.google-alt.com", "dns.google-alt"] as Host[],
    checked: false
  },
  {
    id: 10,
    ip: "208.67.222.220" as IPAddress,
    hostname: ["opendns-alt.com", "opendns-alt"] as Host[],
    checked: false
  },
  {
    id: 11,
    ip: "1.0.0.1" as IPAddress,
    hostname: ["cloudflare-dns-alt.com", "cloudflare-dns-alt"] as Host[],
    checked: false
  },
  {
    id: 12,
    ip: "4.2.2.1" as IPAddress,
    hostname: ["level3-dns-alt.com", "level3-dns-alt"] as Host[],
    checked: false
  },
  {
    id: 13,
    ip: "208.67.220.222" as IPAddress,
    hostname: ["opendns-home-alt.com", "opendns-home-alt"] as Host[],
    checked: false
  },
  {
    id: 14,
    ip: "8.26.56.25" as IPAddress,
    hostname: ["comcast-dns-alt.com", "comcast-dns-alt"] as Host[],
    checked: false
  },
  {
    id: 15,
    ip: "209.18.47.62" as IPAddress,
    hostname: ["norton-dns-alt.com", "norton-dns-alt"] as Host[],
    checked: false
  }
]);


export const [showNotification, setShowNotification]  = createSignal<string>("")
export const [NotifyError, setNotifyError] = createSignal<boolean>(false);
// create a store for check-to-delete feature
export const [checkedItem,setCheckedItem] = createSignal<Map<number,boolean | undefined>>(new Map());
// create a state for delete button visibility
export const [deleteButtonVisibile,setDeleteButtonVisible] = createSignal<boolean>(false);
// state for select all feature
export const [selectAll,setSelectAll] = createSignal<boolean>(false);