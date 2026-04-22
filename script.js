
const columns = [
  "ID","TransactionType","PartyType","TransactionSubType","SpecialType",
  "TransactionDate","VoidType","TransactionNumber","TransactionMethod",
  "TransactionLabel","TransactionStage","AccountPartyTransDate",
  "AccountPartyDueDate","BankAccountID","TransactionStatus",
  "TransactionSubID","ParentTransactionID","SourceTransactionID",
  "LocationPartyID","ProjectManagerID","SalePersonID","SalesPerson2ID",
  "Total","Balance","ForeignTotal","ForeignBalance",
  "AccountingPartyID","AccountingPartyName","AccountingAttn",
  "AccountingAddress","AccountingAddress2","AccountingCity",
  "AccountingState","AccountingZip","AccountingCountry",
  "AccountingPhone1","AccountingFax","AccountingEmail",
  "AccountingMobile","DeliveryType","ShipToPartyID","ShipToContactID",
  "ShipToName","ShipToAttn","ShipToAddress","ShipToAddress2",
  "ShipToCity","ShipToState","ShipToZip","ShipToCountry",
  "ShipToPhone1","ShipToPhone2","ShipToFax","ShipToEmail",
  "JobName","Party1ID","Party2ID","Party3ID","Party4ID","Party5ID","Party6ID",
  "Party1Name","Party2Name","Party3Name","Party4Name","Party5Name","Party6Name",
  "EnduseSegment","ProjectType","TaxItemID","TaxExemptReason","IsTaxExempt",
  "SpecialInstructions","ESTDeliveryDate","RequestedShipDate","CloseDate",
  "ShipmentTerms","PaymentTerms","ContainerNumber","TermsID","InternalNotes",
  "PrintedNotes","Terms","ConversionRate","CurrencyID","StartTime","EndTime",
  "CreatedOn","CreatedBy","UpdatedOn","UpdatedBy","DepositNumber","InvoiceNumber",
  "BOLDate","InventoryReceivedDate","InventoryETADate","IsPaymentHold",
  "PaymentHoldReason","ShipmentTermsID","CustomerReference","SaleOrderReference",
  "FreightForwarder","ReferredByID","CommissionAmount","CommissionNotes",
  "TransactionTime","ContactMode","TPriceLevel","MarketingChannel",
  "QuoteHeader","QuoteFooter","RouteID","Urgency","CreditReleaseOn",
  "CreditReleaseBy","ExpiryDate","InventoryReceivedBy","Transaction_ApproveDate",
  "Transaction_DisapprovedDate","Transaction_Approved_DisapprovedBy",
  "Transaction_Approved_Disapprove_Notes","NoEmailUpdate","AuthorizationNumber",
  "IsCOD","IsSupplierConsignment","ClosedBy","CheckoutTime",
  "ShippingTrackingNumber","Move_to_Staging_Flag","WiringInstructionID",
  "FullfilledDate","PTIReference","BatchID","PackingListDate","Weight",
  "BOLTransactionID","Lot","Subdivision","PickTicketRestriction",
  "ExtnEnergyChargePercentage","ReasonCode","VoidedBy","VoidedOn",
  "FulFilledNotes","TLegacyID","FulfillmentPercent","RequestedBy",
  "PartyPOorSO","ShipmentMethod","SalePersonIDName","SalesPerson2IDName",
  "LocationPartyIDName","SourceTransactionNumber","ParentTransactionNumber",
  "CreatedByName","ClosedNotes","DivisionID","ShipToCounty",
  "THeaderTaxRate","THeaderTax","IsUseTax","UseTaxItemID","TransactionCode"
];

const types = ["PreSale","Purchase","Sale","Inventory","Payable","Banking","Accounting"];

function getValue(col, type) {
  // SIMPLE RULE ENGINE (you can refine later)
  if (col === "ID" || col === "TransactionType") return "req";
  if (col.includes("Date") || col.includes("ID")) return "opt";
  if (type === "Accounting" && col.includes("Accounting")) return "req";
  return "na";
}

function buildMatrix() {
  const body = document.getElementById("matrixBody");
  columns.forEach(col => {
    let row = `<tr><td>${col}</td>`;
    types.forEach(t => {
      let val = getValue(col, t);
      if (val === "req") row += `<td><span class="dot req"></span></td>`;
      else if (val === "opt") row += `<td><span class="dot opt"></span></td>`;
      else row += `<td class="na">–</td>`;
    });
    row += "</tr>";
    body.innerHTML += row;
  });
}

function toggleMatrix() {
  const wrap = document.getElementById("matrixWrap");
  const btn = document.querySelector(".matrix-toggle");
  wrap.classList.toggle("collapsed");
  btn.innerText = wrap.classList.contains("collapsed") ? "Expand" : "Collapse";
}

buildMatrix();

function toggleMatrix() {
  const table = document.getElementById("matrixTable");
  const btn = document.querySelector(".collapse-btn");

  table.classList.toggle("matrix-collapsed");

  btn.innerText = table.classList.contains("matrix-collapsed") ? "▸" : "▾";
}

function toggleFlow(el) {
  const content = el.querySelector(".flow-expand");
  if (!content) return;

  content.style.display =
    content.style.display === "block" ? "none" : "block";
}

function lcToggle(id) {
  const mod = document.getElementById(id);
  if (!mod) return;
  mod.classList.toggle('open');
}
// All open by default — close all except presale on load for cleaner initial view
document.addEventListener('DOMContentLoaded', function() {
  ['lc-purchase','lc-prod','lc-inv','lc-sales','lc-acct'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('open');
  });
});

/* ════════════════════════════════════════════════════════════
   PRESALES · OPPORTUNITY — JS additions
   Append these to your existing script.js
════════════════════════════════════════════════════════════ */

// ── LIFECYCLE MODULE TOGGLE ──
// (Add this if not already present from the lifecycle section)
function lcToggle(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

// ── FTHM TABLE ROW HIGHLIGHT ──
// Clicking a form→TH mapping row highlights the matching TH snapshot row
document.addEventListener('DOMContentLoaded', function () {

  // Highlight TH snapshot rows on fthm row hover
  document.querySelectorAll('.fthm-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function () {
      const colCell = this.querySelector('td.col');
      if (!colCell) return;
      const colName = colCell.textContent.trim().split('+')[0].trim();
      document.querySelectorAll('.ths-col').forEach(c => {
        const match = c.textContent.trim().toLowerCase().includes(colName.toLowerCase().substring(0, 8));
        if (match) {
          c.closest('.ths-row').style.background = 'rgba(240,165,0,0.08)';
        }
      });
    });
    row.addEventListener('mouseleave', function () {
      document.querySelectorAll('.ths-row').forEach(r => {
        r.style.background = '';
      });
    });
  });

  // Update column search to also search table rows in the new section
  const existingSearch = document.getElementById('colSearch');
  if (existingSearch) {
    existingSearch.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      if (!q) return;
      // Also highlight matching fthm rows
      document.querySelectorAll('.fthm-table tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.background = text.includes(q) ? 'rgba(240,165,0,0.06)' : '';
      });
      // Also highlight TH snapshot rows
      document.querySelectorAll('.ths-row').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.background = text.includes(q) ? 'rgba(240,165,0,0.08)' : '';
      });
    });
  }

});

// ── MATRIX TOGGLE (if not already present) ──
function toggleMatrix() {
  const table = document.getElementById('matrixTable');
  if (table) table.classList.toggle('matrix-collapsed');
}
// Highlight linkage between quotes and opportunity
document.querySelectorAll('#presales-quote .ld-node').forEach(node => {
  node.addEventListener('mouseenter', () => {
    node.style.transform = 'scale(1.03)';
  });
  node.addEventListener('mouseleave', () => {
    node.style.transform = 'scale(1)';
  });
});
