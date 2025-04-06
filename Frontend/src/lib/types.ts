export type IPAddress = string & {
  __brand: "IPAddress";
};

export function isValidIP(ip: string): ip is IPAddress {
  const ipRegex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
}

export type Host = string & {
  __brand: "Host";
};

export type IPStore = {
  id: number;
  ip: IPAddress;
  hostname: Host[];
  isNew?: boolean;
  checked?: boolean
};

export interface ComingIpData {
  index:number
  ip: IPAddress;
  hostname: Host[];
  isNew?: boolean;
  checked?: boolean
}
