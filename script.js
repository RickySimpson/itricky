const care = document.querySelector('#care');
const summary = document.querySelector('#price-summary');
const inquiry = document.querySelector('#pricing-inquiry');
function updatePlan() {
  const withCare = care.checked;
  summary.replaceChildren(document.createTextNode('Your website: '));
  const price = document.createElement('strong');
  price.textContent = '$500 one-time.';
  const recurring = document.createElement('span');
  recurring.textContent = withCare ? 'Plus optional care: $20/month.' : 'No care plan selected.';
  summary.append(price, recurring);
  const subject = withCare ? 'My $500 website + $20/month care inquiry' : 'My $500 website inquiry';
  const body = 'Hi Ricky,\n\nI’d like to talk about a website for my business.\n\nBusiness name: \nWhat we do: \nCurrent website (if any): \n' + (withCare ? '\nI’m also interested in the optional $20/month care plan.\n' : '');
  inquiry.href = `mailto:design@itricky.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  summary.classList.remove('summary-change');
  requestAnimationFrame(() => summary.classList.add('summary-change'));
}
care?.addEventListener('change', updatePlan);
if (care) updatePlan();
document.querySelector('#copy-email')?.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('design@itricky.com'); status.textContent = 'Email address copied.'; }
  catch { status.textContent = 'Please select and copy design@itricky.com above.'; }
});
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
