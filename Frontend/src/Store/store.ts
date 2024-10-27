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
  },
  {
    id: 2,
    ip: "8.8.8.8" as IPAddress,
    hostname: ["dns.google", "google-public-dns-a.google.com"] as Host[],
  },
  {
    id: 3,
    ip: "1.1.1.1" as IPAddress,
    hostname: ["cloudflare-dns.com", "cloudflare-dns"] as Host[],
  },
  {
    id: 4,
    ip: "208.67.222.222" as IPAddress,
    hostname: ["opendns.com", "opendns"] as Host[],
  },
  {
    id: 5,
    ip: "4.2.2.2" as IPAddress,
    hostname: ["level3-dns.com", "level3-dns"] as Host[],
  },
  {
    id: 6,
    ip: "208.67.220.220" as IPAddress,
    hostname: ["opendns-home.com", "opendns-home"] as Host[],
  },
  {
    id: 7,
    ip: "8.26.56.26" as IPAddress,
    hostname: ["comcast-dns.com", "comcast-dns"] as Host[],
  },
  {
    id: 8,
    ip: "209.18.47.61" as IPAddress,
    hostname: ["norton-dns.com", "norton-dns"] as Host[],
  },
  {
    id: 9,
    ip: "8.8.4.4" as IPAddress,
    hostname: ["dns.google-alt.com", "dns.google-alt"] as Host[],
  },
  {
    id: 10,
    ip: "208.67.222.220" as IPAddress,
    hostname: ["opendns-alt.com", "opendns-alt"] as Host[],
  },
  {
    id: 11,
    ip: "1.0.0.1" as IPAddress,
    hostname: ["cloudflare-dns-alt.com", "cloudflare-dns-alt"] as Host[],
  },
  {
    id: 12,
    ip: "4.2.2.1" as IPAddress,
    hostname: ["level3-dns-alt.com", "level3-dns-alt"] as Host[],
  },
  {
    id: 13,
    ip: "208.67.220.222" as IPAddress,
    hostname: ["opendns-home-alt.com", "opendns-home-alt"] as Host[],
  },
  {
    id: 14,
    ip: "8.26.56.25" as IPAddress,
    hostname: ["comcast-dns-alt.com", "comcast-dns-alt"] as Host[],
  },
  {
    id: 15,
    ip: "209.18.47.62" as IPAddress,
    hostname: ["norton-dns-alt.com", "norton-dns-alt"] as Host[],
  },
  {
    id: 16,
    ip: "8.8.8.9" as IPAddress,
    hostname: ["dns.google-alt2.com", "dns.google-alt2"] as Host[],
  },
  {
    id: 17,
    ip: "208.67.222.221" as IPAddress,
    hostname: ["opendns-alt2.com", "opendns-alt2"] as Host[],
  },
  {
    id: 18,
    ip: "1.0.0.2" as IPAddress,
    hostname: ["cloudflare-dns-alt2.com", "cloudflare-dns-alt2"] as Host[],
  },
  {
    id: 19,
    ip: "4.2.2.3" as IPAddress,
    hostname: ["level3-dns-alt2.com", "level3-dns-alt2"] as Host[],
  },
  {
    id: 20,
    ip: "208.67.220.223" as IPAddress,
    hostname: ["opendns-home-alt2.com", "opendns-home-alt2"] as Host[],
  },
]);


export const [showNotification, setShowNotification]  = createSignal<string>("")
export const [NotifyError, setNotifyError] = createSignal<boolean>(false);