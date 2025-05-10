export function exportLeadsToCSV(leads) {
  const headers = ['Name', 'Address', 'Phone', 'Website'];
  const rows = leads.map(({ name, formatted_address, formatted_phone_number = '', website = '' }) =>
    [name, formatted_address, formatted_phone_number, website].join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}
