<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate input
    if (!isset($input['orangeCash']) || !isset($input['instapay']) || !isset($input['amount'])) {
        http_response_code(400);
        echo json_encode(['error' => 'البيانات المطلوبة ناقصة']);
        exit();
    }

    $orangeCash = htmlspecialchars($input['orangeCash']);
    $instapay = htmlspecialchars($input['instapay']);
    $amount = floatval($input['amount']);
    $timestamp = date('Y-m-d H:i:s');
    $commission = 5;
    $totalAmount = $amount + $commission;

    // Validate numbers
    if (!preg_match('/^[0-9]{10,15}$/', $orangeCash) || !preg_match('/^[0-9]{10,15}$/', $instapay)) {
        http_response_code(400);
        echo json_encode(['error' => 'أرقام غير صحيحة']);
        exit();
    }

    // Email content
    $to = 'mkhatap53@gmail.com';
    $subject = "طلب تحويل جديد - {$amount} جنيه";
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";

    $emailBody = "
        <html dir='rtl'>
        <head>
            <style>
                body { font-family: Arial, sans-serif; direction: rtl; }
                table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                td { border: 1px solid #ddd; padding: 10px; text-align: right; }
                th { background-color: #667eea; color: white; padding: 10px; text-align: right; }
            </style>
        </head>
        <body>
            <h2 style='color: #667eea;'>طلب تحويل جديد</h2>
            <table>
                <tr>
                    <th>رقم أورانج كاش</th>
                    <td>{$orangeCash}</td>
                </tr>
                <tr>
                    <th>رقم إنستا باي</th>
                    <td>{$instapay}</td>
                </tr>
                <tr>
                    <th>المبلغ</th>
                    <td>{$amount} جنيه</td>
                </tr>
                <tr>
                    <th>النسبة</th>
                    <td>{$commission} جنيه</td>
                </tr>
                <tr>
                    <th>الإجمالي</th>
                    <td><strong>{$totalAmount} جنيه</strong></td>
                </tr>
                <tr>
                    <th>الوقت</th>
                    <td>{$timestamp}</td>
                </tr>
            </table>
            <p style='color: #666; margin-top: 20px;'>يرجى التحقق والرد على العميل في أقرب وقت.</p>
        </body>
        </html>
    ";

    // Send email
    if (mail($to, $subject, $emailBody, $headers)) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'تم استلام طلبك بنجاح',
            'totalAmount' => $totalAmount
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'فشل في إرسال البريد']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'الطريقة غير مسموح بها']);
}
?>